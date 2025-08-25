
# Football Fantasy App - UEFA Champions League

A modern React web application for browsing UEFA Champions League teams and players data from your backend API.

## 🚀 Features

### 🏟️ Teams Standings
- View all teams in a standings table format
- Team rankings with color-coded positions:
  - 🥇 **Gold**: Champions League positions (1-2)
  - 🟢 **Green**: Round of 16 qualified (3-8)  
  - 🟠 **Orange**: Europa League positions (9-24)
  - 🔴 **Red**: Eliminated positions (25+)
- Search teams by name or abbreviation
- Complete statistics: Points, Played, Won, Drawn, Lost, Goals For/Against, Goal Difference

### 👥 Players Search
- **Search by Name**: Find specific players (e.g., "erling", "messi")
- **Filter by Team**: Select from common Champions League teams
- **Filter by Position**: Goalkeeper, Defender, Midfielder, Forward  
- **Filter by Nation**: Search by nationality
- **Combined Filters**: Mix and match criteria (e.g., Arsenal Defenders)
- Color-coded positions for easy identification

### 🎨 Modern UI
- UEFA Champions League themed design
- Dark blue gradient background
- Responsive design for all devices
- Loading states and error handling
- Hover effects and smooth transitions

## 🛠️ API Endpoints Integration

The app integrates with your backend running on `localhost:8080` using these endpoints:

### Player Endpoints
- `GET /api/v1/players` - Get all players
- `GET /api/v1/players?name=erling` - Search by name
- `GET /api/v1/players?team=ars` - Filter by team
- `GET /api/v1/players?nation=eng` - Filter by nation  
- `GET /api/v1/players?position=fw` - Filter by position
- `GET /api/v1/players?position=df&team=ars` - Combined filters

### Team Endpoints  
- `GET /api/v1/teams` - Get all teams
- `GET /api/v1/teams/team/ars` - Get specific team
- `GET /api/v1/teams/rank/2` - Get team by rank
- `GET /api/v1/teams/pts/10` - Get team by points

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Your backend server running on `localhost:8080`

### Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start your backend server** (make sure it's running on `localhost:8080`)

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:5173`

## 📱 How to Use

### Teams Page
1. Navigate to **"Teams Standings"** 
2. View the complete standings table
3. Use the search bar to find specific teams
4. Teams are color-coded by their Champions League qualification status

### Players Page  
1. Navigate to **"Players"**
2. **Search by name**: Enter player name and click "Search by Name"
3. **Filter options**: Use dropdowns to filter by team, position, or nation
4. **Combine filters**: Select multiple criteria for precise results
5. **Clear filters**: Click "Clear All" to reset

### Common Team Codes
- **ARS** - Arsenal
- **CHE** - Chelsea  
- **MCI** - Manchester City
- **MUN** - Manchester United
- **LIV** - Liverpool
- **BAR** - Barcelona
- **MAD** - Real Madrid
- **PSG** - Paris Saint-Germain
- **BAY** - Bayern Munich
- **JUV** - Juventus

### Position Codes
- **GK** - Goalkeeper
- **DF** - Defender
- **MF** - Midfielder  
- **FW** - Forward

## 🛠️ Project Structure

```
src/
├── components/          # Reusable components
├── pages/              
│   ├── Home.jsx        # Landing page with info
│   ├── Teams.jsx       # Teams standings table
│   └── Players.jsx     # Players search & filters
├── services/
│   └── api.js          # API service methods
├── App.jsx             # Main app component
├── App.css             # Champions League themed styles
└── main.jsx            # App entry point
```

## 🎨 Styling Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Champions League Colors**: Blue and gold color scheme
- **Interactive Elements**: Hover effects and smooth transitions  
- **Loading States**: Spinners and loading messages
- **Error Handling**: User-friendly error messages
- **Color-Coded Data**: Position badges and ranking indicators

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Lint Code
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## 🚨 Troubleshooting

### Backend Connection Issues
- Ensure your backend is running on `localhost:8080`
- Check browser console for API errors
- Verify CORS is enabled on your backend

### No Data Showing
- Confirm your backend endpoints return data
- Check the browser's Network tab for failed requests
- Make sure team/player codes match your backend data

### Search Not Working
- Try exact team codes (e.g., "ars" not "arsenal") 
- Use position codes (e.g., "fw" not "forward")
- Check that your backend supports the query parameters

## 🎯 Tips for Best Experience

1. **Start with Teams page** to see the standings
2. **Use exact codes** when filtering (ARS, CHE, FW, DF)
3. **Combine filters** for precise player searches
4. **Try name searches** with partial names (e.g., "erling" finds "Erling Haaland")
5. **Check console** if something isn't working (F12 → Console)

Enjoy exploring your UEFA Champions League data! ⚽🏆

## Folder Structure
- `src/` - Main source code
- `src/pages/` - Page components (Home, Players, Teams)
- `src/components/` - Reusable UI components

## API Endpoints
- `/api/players` - Get list of players
- `/api/teams` - Get list of teams

## Notes
- Ensure the backend is running and accessible for API calls.
- Update API URLs in the frontend if needed.
