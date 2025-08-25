#!/usr/bin/env python3
"""
🧹 DATA CLEANING SCRIPT FOR FOOTBALL FANTASY APP
This script standardizes team names across all CSV files in the data folder.
"""

import pandas as pd
import os
import re
from pathlib import Path
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Team name standardization mapping
TEAM_STANDARDIZATION_MAP = {
    # Fix encoding issues - use ASCII-safe version for MySQL compatibility
    "AtlÃ©tico Madrid": "Atletico Madrid",
    "Atlético Madrid": "Atletico Madrid", 
    "Atletico-Madrid": "Atletico Madrid",
    "Atlético-Madrid": "Atletico Madrid",
    
    # Standardize space vs hyphen (use spaces) - from squad file names
    "Aston-Villa": "Aston Villa",
    "Real-Madrid": "Real Madrid", 
    "Bayern-Munich": "Bayern Munich",
    "Manchester-City": "Manchester City",
    "Club-Brugge": "Club Brugge",
    "Dinamo-Zagreb": "Dinamo Zagreb",
    "Red-Star": "Red Star",
    "Sturm-Graz": "Sturm Graz",
    "Sparta-Prague": "Sparta Prague",
    "PSV-Eindhoven": "PSV Eindhoven",
    "Sporting-CP": "Sporting CP",
    "RB-Leipzig": "RB Leipzig",
    "Young-Boys": "Young Boys",
    "Paris-Saint-Germain": "Paris Saint-Germain",
    "Bayer-Leverkusen": "Bayer Leverkusen",
    "Red-Bull-Salzburg": "RB Salzburg",
    "Shakhtar-Donetsk": "Shakhtar Donetsk",
    "Slovan-Bratislava": "Slovan Bratislava",
    
    # Standardize name variations and abbreviations
    "Internazionale": "Inter Milan",
    "Inter": "Inter Milan",
    "Leverkusen": "Bayer Leverkusen",
    "Paris S-G": "Paris Saint-Germain",
    "Shakhtar": "Shakhtar Donetsk",
    "RB Salzburg": "RB Salzburg",
    
    # Handle country prefix removals (for standing.csv) - use ASCII-safe version
    "eng Liverpool": "Liverpool",
    "eng Arsenal": "Arsenal", 
    "eng Aston Villa": "Aston Villa",
    "eng Manchester City": "Manchester City",
    "es Barcelona": "Barcelona",
    "es Atlético Madrid": "Atletico Madrid",
    "es Atletico Madrid": "Atletico Madrid",
    "es Real Madrid": "Real Madrid",
    "it Inter": "Inter Milan",
    "it Atalanta": "Atalanta",
    "it Milan": "Milan",
    "it Juventus": "Juventus",
    "de Leverkusen": "Bayer Leverkusen",
    "de Dortmund": "Dortmund",
    "de Bayern Munich": "Bayern Munich",
    "de Stuttgart": "Stuttgart",
    "fr Lille": "Lille",
    "fr Paris S-G": "Paris Saint-Germain",
    "fr Monaco": "Monaco",
    "fr Brest": "Brest",
    "nl PSV Eindhoven": "PSV Eindhoven",
    "nl Feyenoord": "Feyenoord",
    "pt Benfica": "Benfica",
    "pt Sporting CP": "Sporting CP",
    "be Club Brugge": "Club Brugge",
    "hr Dinamo Zagreb": "Dinamo Zagreb",
    "ua Shakhtar": "Shakhtar Donetsk",
    "at RB Salzburg": "RB Salzburg",
    "at Sturm Graz": "Sturm Graz",
    "cz Sparta Prague": "Sparta Prague",
    "sk Slovan Bratislava": "Slovan Bratislava",
    "ch Young Boys": "Young Boys",
    "rs Red Star": "Red Star",
    "sct Celtic": "Celtic",
}

def normalize_team_name(team_name):
    """
    Normalize a single team name using the standardization map.
    """
    if not isinstance(team_name, str):
        return team_name
    
    # Direct mapping first
    if team_name in TEAM_STANDARDIZATION_MAP:
        return TEAM_STANDARDIZATION_MAP[team_name]
    
    # Handle country prefix removal with regex
    country_prefix_pattern = r'^(eng|es|it|de|fr|nl|pt|be|hr|ua|at|cz|sk|ch|rs|sct)\s+'
    if re.match(country_prefix_pattern, team_name):
        clean_name = re.sub(country_prefix_pattern, '', team_name)
        # Check if the clean name needs further standardization
        if clean_name in TEAM_STANDARDIZATION_MAP:
            return TEAM_STANDARDIZATION_MAP[clean_name]
        return clean_name
    
    return team_name

def clean_all_teams_ucl_csv():
    """
    Clean the main all_teams_ucl.csv file.
    """
    file_path = Path("data/all_teams_ucl.csv")
    
    if not file_path.exists():
        logger.error(f"File not found: {file_path}")
        return
    
    logger.info("🧹 Cleaning all_teams_ucl.csv...")
    
    try:
        # Read the CSV file
        df = pd.read_csv(file_path)
        
        # Log original unique teams
        if 'Team' in df.columns:
            original_teams = df['Team'].unique()
            logger.info(f"Original teams count: {len(original_teams)}")
            
            # Apply standardization
            df['Team'] = df['Team'].apply(normalize_team_name)
            
            # Log cleaned teams
            cleaned_teams = df['Team'].unique()
            logger.info(f"Cleaned teams count: {len(cleaned_teams)}")
            
            # Show changes
            changes = []
            for orig in original_teams:
                normalized = normalize_team_name(orig)
                if orig != normalized:
                    changes.append((orig, normalized))
            
            if changes:
                logger.info("Team name changes:")
                for old, new in changes:
                    logger.info(f"  ✅ '{old}' -> '{new}'")
            
            # Save the cleaned file
            df.to_csv(file_path, index=False)
            logger.info(f"✅ Saved cleaned all_teams_ucl.csv")
        else:
            logger.warning("No 'Team' column found in all_teams_ucl.csv")
            
    except Exception as e:
        logger.error(f"Error cleaning all_teams_ucl.csv: {e}")

def clean_standing_csv():
    """
    Clean the standing.csv file.
    """
    file_path = Path("data/standing.csv")
    
    if not file_path.exists():
        logger.error(f"File not found: {file_path}")
        return
    
    logger.info("🧹 Cleaning standing.csv...")
    
    try:
        # Read the CSV file
        df = pd.read_csv(file_path)
        
        # Log original unique teams
        if 'Squad' in df.columns:
            original_teams = df['Squad'].unique()
            logger.info(f"Original teams count: {len(original_teams)}")
            
            # Apply standardization
            df['Squad'] = df['Squad'].apply(normalize_team_name)
            
            # Log cleaned teams
            cleaned_teams = df['Squad'].unique()
            logger.info(f"Cleaned teams count: {len(cleaned_teams)}")
            
            # Show changes
            changes = []
            for orig in original_teams:
                normalized = normalize_team_name(orig)
                if orig != normalized:
                    changes.append((orig, normalized))
            
            if changes:
                logger.info("Team name changes:")
                for old, new in changes:
                    logger.info(f"  ✅ '{old}' -> '{new}'")
            
            # Save the cleaned file
            df.to_csv(file_path, index=False)
            logger.info(f"✅ Saved cleaned standing.csv")
        else:
            logger.warning("No 'Squad' column found in standing.csv")
            
    except Exception as e:
        logger.error(f"Error cleaning standing.csv: {e}")

def clean_squad_files():
    """
    Clean all individual squad CSV files and potentially rename them.
    """
    squads_dir = Path("data/squads")
    
    if not squads_dir.exists():
        logger.error(f"Squads directory not found: {squads_dir}")
        return
    
    logger.info("🧹 Cleaning squad files...")
    
    # Get all CSV files in squads directory
    csv_files = list(squads_dir.glob("*.csv"))
    logger.info(f"Found {len(csv_files)} squad files")
    
    file_renames = []
    
    for csv_file in csv_files:
        try:
            # Extract team name from filename (remove .csv)
            original_filename = csv_file.stem
            normalized_team_name = normalize_team_name(original_filename)
            
            # Read and process the CSV content (squad files don't have team columns typically)
            df = pd.read_csv(csv_file)
            
            # Check if there's a team column and clean it
            if 'Team' in df.columns:
                df['Team'] = df['Team'].apply(normalize_team_name)
                df.to_csv(csv_file, index=False)
            
            # Check if filename needs to be changed
            if original_filename != normalized_team_name:
                new_filename = normalized_team_name.replace(" ", "-") + ".csv"
                new_file_path = squads_dir / new_filename
                file_renames.append((csv_file, new_file_path, original_filename, normalized_team_name))
            
            logger.info(f"✅ Processed {csv_file.name}")
            
        except Exception as e:
            logger.error(f"Error processing {csv_file}: {e}")
    
    # Handle file renames (keeping hyphens in filenames for consistency)
    if file_renames:
        logger.info("Squad file renames needed:")
        for old_path, new_path, old_name, new_name in file_renames:
            logger.info(f"  📁 '{old_path.name}' -> '{new_path.name}' ('{old_name}' -> '{new_name}')")
            
        # Actually perform renames (uncomment if you want to rename files)
        # for old_path, new_path, old_name, new_name in file_renames:
        #     try:
        #         old_path.rename(new_path)
        #         logger.info(f"✅ Renamed {old_path.name} to {new_path.name}")
        #     except Exception as e:
        #         logger.error(f"Error renaming {old_path.name}: {e}")

def verify_consistency():
    """
    Verify that team names are consistent across all files.
    """
    logger.info("🔍 Verifying team name consistency...")
    
    all_teams = set()
    standing_teams = set()
    squad_teams = set()
    
    # Get teams from all_teams_ucl.csv
    all_teams_file = Path("data/all_teams_ucl.csv")
    if all_teams_file.exists():
        try:
            df = pd.read_csv(all_teams_file)
            if 'Team' in df.columns:
                all_teams = set(df['Team'].dropna().unique())
                logger.info(f"Teams in all_teams_ucl.csv: {len(all_teams)}")
        except Exception as e:
            logger.error(f"Error reading all_teams_ucl.csv: {e}")
    
    # Get teams from standing.csv
    standing_file = Path("data/standing.csv")
    if standing_file.exists():
        try:
            df = pd.read_csv(standing_file)
            if 'Squad' in df.columns:
                standing_teams = set(df['Squad'].dropna().unique())
                logger.info(f"Teams in standing.csv: {len(standing_teams)}")
        except Exception as e:
            logger.error(f"Error reading standing.csv: {e}")
    
    # Get teams from squad filenames
    squads_dir = Path("data/squads")
    if squads_dir.exists():
        csv_files = list(squads_dir.glob("*.csv"))
        squad_teams = set()
        for csv_file in csv_files:
            team_name = normalize_team_name(csv_file.stem)
            squad_teams.add(team_name)
        logger.info(f"Teams from squad files: {len(squad_teams)}")
    
    # Compare consistency
    logger.info("\n📊 CONSISTENCY REPORT:")
    
    if all_teams and standing_teams:
        missing_in_standing = all_teams - standing_teams
        missing_in_all_teams = standing_teams - all_teams
        
        if missing_in_standing:
            logger.warning(f"Teams in all_teams_ucl.csv but not in standing.csv: {missing_in_standing}")
        if missing_in_all_teams:
            logger.warning(f"Teams in standing.csv but not in all_teams_ucl.csv: {missing_in_all_teams}")
        
        if not missing_in_standing and not missing_in_all_teams:
            logger.info("✅ all_teams_ucl.csv and standing.csv are consistent!")
    
    if all_teams and squad_teams:
        missing_in_squads = all_teams - squad_teams
        missing_in_all_teams = squad_teams - all_teams
        
        if missing_in_squads:
            logger.warning(f"Teams in all_teams_ucl.csv but no squad file: {missing_in_squads}")
        if missing_in_all_teams:
            logger.warning(f"Squad files but not in all_teams_ucl.csv: {missing_in_all_teams}")
        
        if not missing_in_squads and not missing_in_all_teams:
            logger.info("✅ all_teams_ucl.csv and squad files are consistent!")
    
    # Print all unique teams found
    logger.info("\n📋 ALL UNIQUE TEAMS FOUND:")
    all_unique_teams = all_teams | standing_teams | squad_teams
    for i, team in enumerate(sorted(all_unique_teams), 1):
        logger.info(f"  {i:2d}. {team}")
    
    logger.info(f"\n🎯 Total unique teams: {len(all_unique_teams)}")

def main():
    """
    Main function to run all data cleaning operations.
    """
    logger.info("🚀 Starting Football Fantasy App Data Cleaning...")
    logger.info("=" * 60)
    
    # Change to the Data-Scraping directory
    os.chdir(Path(__file__).parent)
    
    # Clean all CSV files
    clean_all_teams_ucl_csv()
    clean_standing_csv()
    clean_squad_files()
    
    # Verify consistency
    verify_consistency()
    
    logger.info("=" * 60)
    logger.info("✅ Data cleaning completed!")
    logger.info("\n📝 SUMMARY:")
    logger.info("- Team names standardized across all files")
    logger.info("- Country prefixes removed from standing.csv")
    logger.info("- Hyphenated names converted to spaces")
    logger.info("- UTF-8 encoding issues fixed (if any)")
    logger.info("\n🎯 Next steps:")
    logger.info("- Review the changes above")
    logger.info("- Test your frontend filtering functionality")
    logger.info("- Update your backend API if needed")

if __name__ == "__main__":
    main()
