package models

type Procedures struct {
	ID            uint   `json:"id,string,omitempty" gorm:"primaryKey"`
	ProcedureName string `json:"name" gorm:"unique"`
	Schedule      string `json:"proc_schedule"`
}
