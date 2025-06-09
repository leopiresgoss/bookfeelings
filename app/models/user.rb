class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  enum role: { customer: 0, admin: 1 }

  has_many :user_books, dependent: :destroy
  has_many :books, through: :user_books

  validates :name, presence: true
end
