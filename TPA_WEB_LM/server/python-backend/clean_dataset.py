import pandas as pd
import shutil

train_csv = pd.read_csv("./AIDataset/valid/_classes.csv")
labels = []
image_paths = []
count = 0

def get_label(row) : 
    Brazil = row.Brazil
    Canada = row.Canada
    Finland = row.Finland
    United_Kingdom = row.United_Kingdom
    Japan = row.Japan
    United_States = row.United_States
    Unlabeled = row.Unlabeled
    if(Brazil == 1) :
        return "Brazil"
    elif(Canada == 1) : 
        return "Canada"
    elif(United_Kingdom == 1) : 
        return "United_Kingdom"
    elif(Finland == 1) : 
        return "Finland"
    elif(Japan == 1) : 
        return "Japan"
    elif(United_States == 1) : 
        return "United_States"
    elif(Unlabeled == 1) : 
        return "Unlabeled"


for index, row in train_csv.iterrows():
    path = row.filename
    image_paths.append("./AIDataset/valid/" + path)
    labels.append(get_label(row))
    
print(image_paths)

for image_path, label in zip(image_paths, labels) : 
    try:
        destination_path = "./AIDataset/valid/" + label + "/"
        shutil.move(image_path, destination_path)   
    except Exception as e:
        print(f"An exception occurred: {e}")
