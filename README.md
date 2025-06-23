# 🌱CarbonPulse

CarbonPulse is an application designed to help users estimate their carbon emissions based on logged activities. The aim is to raise environmental awareness by providing intuitive visualizations and actionable insights.

### Features

1. **Activity Logging**

   - A user can log their daily activities to keep a track of the carbon emissions they're causing through their actions based on which they can take on actionable insights.

2. **Real-Time Carbon Footprint Prediction**

   - Implemented ML algorithms through which the application predicts the user's estimated carbon emissions for the day through the previous activities performed by them, though which the user can be aware of their limit and perform their actions accordingly.

3. **Smart Recommendation**

   - Implemented NLP based techinques through which the application provides the user with recommendation on how the user can reduce their emissions, based on their daily activities performed at the end of the day.

### Tech Stack Used

- **_Frontend:_**

  - React.js (Typescript)
  - TailwindCSS
  - MaterialUI

- **_Backend:_**

  - Node.js + Express.js (Typescript)
  - PostgreSQL

- **_Machine Learning Model:_**

  - Python (Pandas, Scikit-Learn, Numpy)
  - Jupyter Notebook

- **_Others:_**

  - Docker
  - Prisma ORM

### Machine Learning Model Training

1. _Datasets Used:_

   - [Individual Carbon Footprint Calculation]("https://www.kaggle.com/datasets/dumanmesut/individual-carbon-footprint-calculation") -> Kaggle
   - [CO₂ emissions dataset]("https://ourworldindata.org/co2-dataset-sources") -> Our World in Data Website

2. _Preprocessing Steps:_

   - Feature Engineering
   - Missing Values Handling
   - One Hot Encoding
   - Standardization

3. _Model Used:_

   - Random Forest Regressor

4. _Evaluation Metrics:_
   - R2 Score
   - RMSE (Random Mean Squared Error)
   - MAE (Mean Absolute Error)

### System Architecture Diagram

![CarbonPulse System Architecture]("docs/Project_Structure.png")

### Achievements

1. The project won 1st Prize in a poster competition at **_BCSWomen Lovelace Colloquium_** in the _Final Year Category_ in 2025 held at **_University of Glasgow, Glasgow, Scotland_**.

2. Project Poster:
   ![CarbonPulse Project Poster]("docs/Competition_Poster.png")

3. The winning certificate for the competition can be viewed [Here]("https://drive.google.com/file/d/128gMTLFLbcnBjW8-5EXdnHoibuGuRq2w/view?usp=sharing")

4. More Details about the poster competition and my concept of the poster can be viewed at [Official BCSWomen Website]("https://bcswomenlovelace.bcs.org/?page_id=617")

### Acknowledgements

- [Carbon Interface API]("https://docs.carboninterface.com/#/?id=introduction") was used for smooth calculation and estimation of the carbon footprint produced based on the used activities.
- Inspiration was taken from [WWF]("https://support.wwf.org.uk/adoptions") and [The Nature Conservancy]("https://www.nature.org/en-us/get-involved/how-to-help/carbon-footprint-calculator/?utm_source=chatgpt.com)

### Thank You

1. If you really liked the project then do show some love by starring the project! :)
2. Live Application _Coming Soon!_
