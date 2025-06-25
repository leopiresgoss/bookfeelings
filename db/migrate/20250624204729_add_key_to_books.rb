# frozen_string_literal: true

class AddKeyToBooks < ActiveRecord::Migration[7.1]
  def change
    add_column :books, :key, :string
    add_index :books, :key, unique: true
  end
end
