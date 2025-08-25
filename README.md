# ⚽ Football Fantasy App – UEFA Champions League

The Football Fantasy App is an end-to-end **football analytics pipeline** that combines **data scraping, database engineering, machine learning, backend development, and frontend design**. Historical UEFA Champions League (UCL) data (2017–2024) was scraped and cleaned, stored in a **MySQL database**, and served through a **Spring Boot REST API**. A **Random Forest Classifier** was trained with engineered features such as rolling 5-game form statistics to predict match outcomes. The **React.js frontend**, integrated with backend APIs, displays structured standings and results for the **2024–25 UCL season**, making the app a **full-stack ML-powered platform** from raw data to insights.

---

## 🚀 Project Overview
- **Data Acquisition**
  - [`scraping.ipynb`](Data-Scraping/scraping.ipynb) was used to scrape team standings and player stats from [FBref](https://fbref.com) using **Selenium (Python)** (2024–25).  
  - Pulled structured match results with **worldfootballR (R package)** (2017–24).  

- **Data Cleaning**
  - [`clean_data.py`](Data-Scraping/clean_data.py) standardizes team names, fixes UTF-8 encoding, removes country prefixes, and ensures dataset consistency.  
  - Cleaned outputs saved back into `/data` for downstream use.  

- **Data Storage**
  - Designed a **MySQL schema** in [`import_data.sql`](Data-Scraping/import_data.sql) for storing UCL player statistics.  
  - Used `LOAD DATA LOCAL INFILE` for **bulk CSV import**, with `NULLIF()` to handle missing values and `IGNORE` clauses to skip unnecessary columns.  
  - Configured session modes (disabled strict mode) to ensure smooth ingestion while preserving all rows.  

- **Feature Engineering & ML**
  - [`prediction.ipynb`](Model/prediction.ipynb) encodes categorical features, builds rolling 5-game form stats, and trains a **Random Forest Classifier**.  
  - Accuracy improved from ~0.48 (baseline) → ~0.55–0.60 (with form features).  
  - Training data: **2017–24 seasons**.  

- **Backend (Spring Boot + MySQL)**
  - [`src`](Backend/src) exposes REST APIs to serve match results and model predictions.  
  - APIs interact directly with the MySQL database.  

- **Frontend (React.js)**
  - [`Frontend/`](Frontend/) contains a responsive React app that displays **UCL 2024–25 standings and results**.  
  - Integrated with backend APIs, fixed ranking issues, and optimized for responsiveness.  

---

## 🛠️ Tech Stack

![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![R](https://img.shields.io/badge/R-276DC3?logo=r&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?logo=pandas&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?logo=scikitlearn&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white)

