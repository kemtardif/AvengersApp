class AddAdmin < ActiveRecord::Migration[5.2]
  def change
    User.create! do |u|
      u.email     = 'admin@admin.com'
      u.password  = 'password'
      u.admin_role = true
  end
  end
end
