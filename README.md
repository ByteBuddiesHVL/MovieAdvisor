# MovieAdvisor🎬
A Machine Learning project that provides personalized movie recommendations based on ratings and preferences.

### Purpose
Project for the DAT158 course at [Western Norway University of Applied Sciences](https://www.hvl.no/en/)

## Dataset
This project uses the [MovieLens 32M Dataset](https://grouplens.org/datasets/movielens/32m/) for movie recommendations. The dataset was created by the GroupLens Research team at the University of Minnesota and contains over 32 million ratings and 2 million tags applied to nearly 88,000 movies.

More info about the dataset in [data/README.md](data/README.md)

#### Citation:
> F. Maxwell Harper and Joseph A. Konstan. 2015. The MovieLens Datasets: History and Context. ACM Transactions on Interactive Intelligent Systems (TiiS) 5, 4: 19:1–19:19. <https://doi.org/10.1145/2827872>

## Usage
You will need to get your own API key from [OMDb](https://www.omdbapi.com/apikey.aspx). After activating and receiving your key, create a `.env` file in the root directory, and add the API as follows:
- OMDB_API_KEY={`API-key`}

The `app.py` file retrieves the uploaded `model.pkl` file and `movies.csv` file from an AWS S3 bucket. You can either load these files locally, or you will have to use your own AWS S3 bucket and an IAM user with the necessary permissions to access the bucket. You will then need to add these lines to your `.env` file, if you wish to use AWS S3:
- S3_BUCKET={`s3 bucket name, e.g., movieadvisorbucket`}
- AWS_REGION={`aws region, e.g., eu-north-1`}
- AWS_ACCESS_KEY_ID={`access key ID for your IAM user`}
- AWS_SECRET_ACCESS_KEY={`secret access key for your IAM user`}

## Data Attribution
This project uses data from the [OMDb API](https://www.omdbapi.com/), which is licensed under the [CC BY-NC 4.0 license](https://creativecommons.org/licenses/by-nc/4.0/). Data from OMDB API is used strictly for non-commercial purposes.

## License
This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License. For more details, see the [LICENSE](LICENSE) file.

> Note: This project is intended solely for educational purposes and does not have any commercial intent.

by: [williamsaether](https://github.com/williamsaether) & [omegeland](https://github.com/omegeland)