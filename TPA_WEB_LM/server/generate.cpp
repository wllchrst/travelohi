#include <iostream>
#include <fstream>
#include <string>

#include <sys/stat.h>

using namespace std;

void replaceString(string& str, const string& find, const string& replace) {
    size_t pos = 0;
    while ((pos = str.find(find, pos)) != string::npos) {
        str.replace(pos, find.length(), replace);
        pos += replace.length();
    }
}

void convertToUpper(string& str) {
    for (int i = 0; i < str.length(); ++i) {
        str[i] = toupper(str[i]);
    }
}

void convertToLower(string& str) {
    for (int i = 0; i < str.length(); ++i) {
        str[i] = tolower(str[i]);
    }
}


void replaceAndSaveToFile(const string& inputFilePath, const string& outputFilePath, const string& find, const string& replace) {
    // Open the input file for reading
    ifstream inputFile(inputFilePath);

    // Check if the input file is opened successfully
    if (!inputFile.is_open()) {
        cerr << "Error opening the input file." << endl;
        return;
    }

    // Read the entire content of the input file
    string fileContent((istreambuf_iterator<char>(inputFile)), (istreambuf_iterator<char>()));

    // Close the input file
    inputFile.close();

    // Replace occurrences of 'find' with 'replace'
    replaceString(fileContent, find, replace);

    // Open the output file for writing
    ofstream outputFile(outputFilePath);

    // Check if the output file is opened successfully
    if (!outputFile.is_open()) {
        cerr << "Error opening the output file." << endl;
        return;
    }

    // Write the modified content to the output file
    outputFile << fileContent;

    // Close the output file
    outputFile.close();

    cout << "File successfully replaced and saved to " << outputFilePath << endl;
}


void replaceInFile(const string& filePath, const string& find, const string& replace) {
    // Open the file for reading
    ifstream inputFile(filePath);

    // Check if the file is opened successfully
    if (!inputFile.is_open()) {
        cerr << "Error opening the file." << endl;
        return;
    }

    // Read the entire content of the file
    string fileContent((istreambuf_iterator<char>(inputFile)), (istreambuf_iterator<char>()));

    // Close the file
    inputFile.close();

    // Replace occurrences of 'find' with 'replace'
    replaceString(fileContent, find, replace);

    // Open the file for writing
    ofstream outputFile(filePath);

    // Check if the file is opened successfully
    if (!outputFile.is_open()) {
        cerr << "Error opening the file for writing." << endl;
        return;
    }

    // Write the modified content back to the file
    outputFile << fileContent;

    // Close the file
    outputFile.close();
}

int main() {
    // Specify the file path
    string inputFilePath = "./main-backend/controllers/controller-template.go";  // Replace with the actual path of your input file
    string outputFilePath = "./main-backend/controllers/";  // Replace with the desired path for the output file

    // Specify the substring to find and the replacement string

    // ! Object -> ModelName
    string modelName;
    cout << "INPUT MODEL NAME : ";
    cin >> modelName;

    string path = modelName;

    convertToLower(path);
    path.append("-controller.go");

    outputFilePath.append(path);


    replaceAndSaveToFile(inputFilePath, outputFilePath, "Object", modelName);

    // ! OBJECT -> MODELNAME
    convertToUpper(modelName);
    replaceInFile(outputFilePath, "OBJECT", modelName);

    // ! object -> modelname
    convertToLower(modelName);
    replaceInFile(outputFilePath, "object", modelName);


    return 0;
}
