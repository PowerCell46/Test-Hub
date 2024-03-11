export function encodeURLSegment(segment: string): string {
    let encodedSegment = segment.replace(/\s+/g, '-');
  
    encodedSegment = encodeURIComponent(encodedSegment);
  
    encodedSegment = encodedSegment.replace(/%2F/g, '/'); // Allow slashes
    encodedSegment = encodedSegment.replace(/%3A/g, ':'); // Allow colons
  
    return encodedSegment;
}


export function decodeURLSegment(segment: string): string {
    let decodedSegment = decodeURIComponent(segment);
  
    decodedSegment = decodedSegment.replace(/-/g, ' ');
    
    return decodedSegment;
}