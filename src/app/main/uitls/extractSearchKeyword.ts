export default function extractSearchKeyword(address: string): string {
  if (!address) return '';
  const addressParts = address.split(' ');
  const keyword = addressParts.find(
    (part) => part.includes('동') || part.includes('구') || part.includes('로'),
  );
  return keyword ? keyword : '';
}
