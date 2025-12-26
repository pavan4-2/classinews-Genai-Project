import joblib
import os
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import nltk

# Ensure NLTK data is downloaded (might be redundant if already done in train_model, but good for safety)
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

class NewsClassifier:
    def __init__(self):
        self.model = None
        self.vectorizer = None
        self.load_model()

    def load_model(self):
        if os.path.exists("model.joblib") and os.path.exists("vectorizer.joblib"):
            self.model = joblib.load("model.joblib")
            self.vectorizer = joblib.load("vectorizer.joblib")
        else:
            print("Model not found. Please run train_model.py first.")

    def preprocess_text(self, text):
        ps = PorterStemmer()
        stop_words = set(stopwords.words('english'))
        text = str(text).lower()
        words = text.split()
        filtered_words = [ps.stem(word) for word in words if word not in stop_words]
        return " ".join(filtered_words)

    def predict(self, text):
        if not self.model or not self.vectorizer:
            return None
        
        clean_text = self.preprocess_text(text)
        text_vector = self.vectorizer.transform([clean_text])
        prediction = self.model.predict(text_vector)
        
        # Map class index to name (AG News dataset)
        categories = {1: "World", 2: "Sports", 3: "Business", 4: "Sci/Tech"}
        return categories.get(prediction[0], "Unknown")

classifier = NewsClassifier()
