class User < ApplicationRecord
  enum role: { customer: 0, admin: 1 }

  has_many :books, through: :user_books

  validates :name, presence: true
end
