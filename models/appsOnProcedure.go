package models

type AppOnProcedure struct {
	ID            uint   `json:"id,string,omitempty" gorm:"primaryKey"`
	Approved      uint   `json:"approved"`
	UserName      string `json:"userName"`
	UserSurname   string `json:"userSurname"`
	UserIIN       string `json:"userIIN"`
	ProcedureName string `json:"procedureName"`
	AppTime       uint   `json:"AppTime"`
}
