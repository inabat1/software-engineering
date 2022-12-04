package models

type Treatments struct {
	ID            uint   `json:"id,string,omitempty" gorm:"primaryKey"`
	UserName      string `json:"userName"`
	UserSurname   string `json:"userSurname"`
	UserIIN       string `json:"IINnum" gorm:"not null"`
	DoctorId      uint   `json:"doctorId" gorm:"not null"`
	DoctorName    string `json:"doctorName"`
	DoctorSurname string `json:"doctorSurname"`
	Treat         string `gorm:"text" json:"treat"`
}
