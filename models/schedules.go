package models

type Schedules struct {
	Approved int    `json:"approved"`
	UserIIN  string `json:"userIIN"`
	DoctorID uint   `json:"doctorID"`
	AppTime  uint   `json:"appTime"`
}
