
import { format } from 'date-fns';

// Format time ago (relative time)
export const formatTimeAgo = (dateString: string) => {
  try {
    return format(new Date(dateString), 'PPp');
  } catch (e) {
    return 'Unknown date';
  }
};

// Format price for display
export const formatPrice = (price: string) => {
  if (!price) return '-';
  const numPrice = parseFloat(price);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price.includes('.') ? numPrice : numPrice / 100);
};

// Get status badge variant
export const getStatusClass = (status: string) => {
  if (status === 'ACTIVE' || status === 'LISTING_STATUS_ACTIVE') {
    return "bg-green-500/10 text-green-600 border-green-200";
  } else if (status === 'PENDING' || status === 'LISTING_STATUS_PENDING') {
    return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
  } else if (status === 'EXPIRED' || status === 'LISTING_STATUS_EXPIRED') {
    return "bg-red-500/10 text-red-600 border-red-200";
  } else if (status === 'SOLD' || status === 'LISTING_STATUS_SOLD') {
    return "bg-blue-500/10 text-blue-600 border-blue-200";
  }
  return "";
};
