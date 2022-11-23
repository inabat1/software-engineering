package models

type Admin struct {
	Id       uint
	Username string `gorm:"unique"`
	Password []byte
}
