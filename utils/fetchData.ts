export const fetchData = async (endpoint: string) => {
  const baseUrl =
    process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000";
  const url = `${baseUrl}/api/${endpoint}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return { docs: [] };
  }
};

// Specific function for fetching images from Payload
