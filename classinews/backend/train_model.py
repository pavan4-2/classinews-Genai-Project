import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import joblib
import os

# Download NLTK data
nltk.download('stopwords')

def preprocess_text(text):
    ps = PorterStemmer()
    stop_words = set(stopwords.words('english'))
    text = str(text).lower()
    words = text.split()
    filtered_words = [ps.stem(word) for word in words if word not in stop_words]
    return " ".join(filtered_words)

def train():
    print("Loading data...")
    # Adjust path if running from backend dir or root
    data_path = "../train.csv"
    if not os.path.exists(data_path):
        data_path = "train.csv"
    
    if not os.path.exists(data_path):
        print(f"Error: {data_path} not found.")
        return

    data = pd.read_csv(data_path)
    
    print("Preprocessing...")
    data['clean_text'] = data['Description'].fillna('').apply(preprocess_text)
    
    X = data['clean_text']
    y = data['Class Index']
    
    print("Vectorizing...")
    tfidf = TfidfVectorizer()
    X_tfidf = tfidf.fit_transform(X)
    
    print("Training model...")
    model = MultinomialNB()
    model.fit(X_tfidf, y)
    
    print("Saving model...")
    joblib.dump(model, 'model.joblib')
    joblib.dump(tfidf, 'vectorizer.joblib')
    print("Done!")

if __name__ == "__main__":
    train()
