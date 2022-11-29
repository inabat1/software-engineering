package models

type Schedules struct {
	ID            uint   `json:"id,string,omitempty" gorm:"primaryKey"`
	Approved      int    `json:"approved"`
	UserName      string `json:"userName"`
	UserSurname   string `json:"userSurname"`
	UserIIN       string `json:"userIIN"`
	DoctorID      uint   `json:"doctorID"`
	DoctorName    string `json:"doctorName"`
	DoctorSurname string `json:"doctorSurname"`
	AppTime       uint   `json:"appTime"`
}
