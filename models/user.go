package models

type User struct {
	Base
	Name              string `json:"name"`
	Surname           string `json:"surname"`
	MiddleName        string `json:"middleName"`
	DataOfBirth       string `json:"dateOfBirth"`
	IIN_Number        string `json:"iinNum"`
	ID_Number         string `json:"idNum"`
	ContactNumber     string `json:"contactNum"`
	Address           string `json:"address"`
	Email             string `json:"email" gorm:"unique"`
	BloodGroup        string `json:"bloodGroup"`
	EmerContactNumber string `json:"emerContactNum"`
	MaritalStatus     string `json:"maritalSts"`
}
