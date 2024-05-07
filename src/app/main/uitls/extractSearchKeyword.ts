export default function extractSearchKeyword(address: string): string {
  if (!address) return '';
  const addressParts = address.split(' ');
  const keyword = addressParts.find((part) => part.includes('로') || part.includes('구'));
  return keyword ? keyword : '';
}
