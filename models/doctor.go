package models

type Doctor struct {
	Base
	Name           string `json:"name"`
	Surname        string `json:"surname"`
	MiddleName     string `json:"middleName"`
	DataOfBirth    string `json:"dateOfBirth"`
	IIN_Number     string `json:"iinNum"`
	ID_Number      string `json:"idNum"`
	ContactNumber  string `json:"contactNum"`
	Address        string `json:"address"`
	Department     string `json:"department"`
	Specialization string `json:"specialization"`
	Experience     string `json:"experience"`
	Photo          string `json:"photo"`
	Category       string `json:"category"`
	Price          string `json:"price"`
	Schedule       string `json:"schedule"`
	Degree         string `json:"degree"`
	Rating         string `json:"rating"`
}
