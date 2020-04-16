import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.metrics import roc_auc_score,roc_curve
from sklearn.model_selection import cross_val_score
import sys

df=pd.read_csv("heart.csv")
#df.head(10)

x=df.drop(['target'],axis=1)
y=df['target']
#x.drop(['target'],axis=1,inplace=True)
#print(x.head(10))
#print(y.head(10))

x_train, x_test, y_train, y_test= train_test_split(x,y,test_size=0.2,random_state=42)

gb_clf2 = GradientBoostingClassifier(n_estimators=20, learning_rate=0.05, max_features=2, max_depth=2, random_state=0)
gb_clf2.fit(x_train, y_train)
predictions=gb_clf2.predict(x_test)

#Create true and false positive rates
y_probabilities = gb_clf2.predict_proba(x_test)[:,1]
false_positive_rate_gb_clf,true_positive_rate_gb_clf,threshold_gb_clf = roc_curve(y_test,y_probabilities)

age = sys.argv[1]
sex = sys.argv[2]
cp = sys.argv[3]
trestbps = sys.argv[4]
chol = sys.argv[5]
fbs = sys.argv[6]
restecg = sys.argv[7]
thalach = sys.argv[8]
exang = sys.argv[9]
oldpeak = sys.argv[10]
slope = sys.argv[11]
ca = sys.argv[12]
thal = sys.argv[13]

input_params = np.array([[(age),(sex),(cp),(trestbps),(chol),(fbs),(restecg),(thalach),(exang),(oldpeak),(slope),(ca),(thal)]])
outcome = gb_clf2.predict(input_params)
result = outcome[0]
outcome_result_dict = {
    1: 'No heart disease',
    0: 'Possibility of heart disease'
}
print('Result: {}'.format(outcome_result_dict[result]))