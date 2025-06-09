class Book < ApplicationRecord
  has_many :user_books, dependent: :destroy
  has_many :users, through: :user_books

  validates :title, presence: true
  validates :author, presence: true
  validates :stars, numericality: { only_integer: true, allow_nil: true }
end 