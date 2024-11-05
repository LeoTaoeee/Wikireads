CREATE TABLE Users (
    uniqname TEXT PRIMARY KEY,
    password TEXT NOT NULL,  
    filename TEXT             
);

CREATE TABLE Articles (
    article_id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_name TEXT NOT NULL,
    article_filename TEXT,       
    avg_rating REAL CHECK(avg_rating BETWEEN 0 AND 5), 
    genre TEXT,
    article_desc TEXT CHECK(length(article_desc) <= 500) 


CREATE TABLE Reads (
    uniqname TEXT,
    article_id INTEGER,
    percent_completion REAL CHECK(percent_completion BETWEEN 0 AND 100),  

    PRIMARY KEY (uniqname, article_id),
    FOREIGN KEY (uniqname) REFERENCES Users(uniqname) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES Articles(article_id) ON DELETE CASCADE
);

