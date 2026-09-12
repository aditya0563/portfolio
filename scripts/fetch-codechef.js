import fs from 'fs';
import path from 'path';
import { getCodeChefData } from 'proxor';

const HANDLE = 'major_epic_51';
const DATA_FILE = path.join(process.cwd(), 'src/data/codechef.json');

async function main() {
  try {
    console.log(`Fetching CodeChef data for ${HANDLE}...`);
    const data = await getCodeChefData(HANDLE);

    if (data && data.status !== 404) {
      // We will merge it with existing fallback data just in case API returns NaN (e.g., if unrated)
      let existingData = {};
      try {
        existingData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      } catch (e) {
        // file might not exist or be invalid, ignore
      }

      const mergedData = {
        username: HANDLE,
        name: data.name || existingData.name || '',
        country: data.countryName || existingData.country || 'India',
        stars: (data.stars === 'unrated' || !data.stars) ? existingData.stars : data.stars,
        highestRating: isNaN(data.highestRating) ? existingData.highestRating : data.highestRating,
        currentRating: isNaN(data.currentRating) ? existingData.currentRating : data.currentRating,
        globalRank: isNaN(data.globalRank) ? existingData.globalRank : data.globalRank,
        countryRank: isNaN(data.countryRank) ? existingData.countryRank : data.countryRank,
        problemsSolved: data.problemSolved || existingData.problemsSolved || 0,
        contestsParticipated: existingData.contestsParticipated || 25, // proxor doesn't return contests directly
        lastUpdated: new Date().toISOString()
      };

      fs.writeFileSync(DATA_FILE, JSON.stringify(mergedData, null, 2));
      console.log('CodeChef data updated successfully!');
    } else {
      console.log('CodeChef profile not found or API returned an error.');
    }
  } catch (error) {
    console.error('Error fetching CodeChef data:', error);
    process.exit(1);
  }
}

main();
