
import { InventoryItem } from '../components/inventory-drawer/types';
import { FilterValues } from '../components/FilterModal';

/**
 * Filter inventory items based on search query and filter values
 */
export function filterInventoryItems(
  items: InventoryItem[], 
  searchQuery: string = '', 
  filters: FilterValues | null = null
): InventoryItem[] {
  // First filter by search query
  let filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.styleId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Then apply additional filters if they exist
  if (filters) {
    filteredItems = filteredItems.filter(item => {
      // Spread filter
      if (filters.spreadType === 'greater' && (item.spread || 0) < filters.spreadValue) {
        return false;
      }

      // Days Listed filter
      if (filters.daysListedType === 'greater' && (item.daysListed || 0) < filters.daysListedValue) {
        return false;
      }

      // Lowest Ask filter
      if (filters.lowestAsk === 'lowestAsk' && !item.isLowestAsk) {
        return false;
      } else if (filters.lowestAsk === 'notLowestAsk' && item.isLowestAsk) {
        return false;
      }

      // Expired filter
      if (filters.showOnlyExpired && !item.isExpired) {
        return false;
      }

      return true;
    });
  }

  return filteredItems;
}
