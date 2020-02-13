from sqlalchemy import create_engine 
from sqlalchemy.orm import scoped_session, sessionmaker 
from sqlalchemy.ext.declarative import declarative_base


# Database
engine = create_engine('sqlite:///model.db')
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))
