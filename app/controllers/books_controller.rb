# frozen_string_literal: true

class BooksController < ApplicationController
  before_action :authenticate_user!

  def index
    @books = current_user.books
    @book = Book.new
  end

  def create
    @book = Book.find_or_create_by(book_params)

    if @book.errors.any?
      flash[:alert] = 'Book not found'
      @books = current_user.books

      return render :index
    end

    user_book = UserBook.new(user: current_user, book: @book)

    user_book.save

    respond_to do |format|
      format.html { redirect_to books_url }
    end
  end

  private

  def book_params
    params.require(:book).permit(:key, :title, :author)
  end
end
