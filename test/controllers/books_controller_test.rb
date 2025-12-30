# frozen_string_literal: true

require 'test_helper'

class BooksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    sign_in @user
  end

  test 'should get index' do
    get books_url
    assert_response :success
  end

  test 'should create book and associate with user' do
    assert_difference('Book.count') do
      post books_url, params: { book: { key: 'OL123M', title: 'Test Book', author: 'Test Author' } }
    end

    assert_redirected_to books_url
    assert @user.books.exists?(key: 'OL123M')
  end
end