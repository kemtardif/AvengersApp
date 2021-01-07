# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
9.times do |i|
    Recipe.create(
      name: "Recipe #{i + 1}",
      ingredients: '227g tub clotted cream, 25g butter, 1 tsp cornflour,100g parmesan, grated nutmeg, 250g fresh fettuccine or tagliatelle, snipped chives or chopped parsley to serve (optional)',
      instruction: 'In a medium saucepan, stir the clotted cream, butter, and cornflour over a low-ish heat and bring to a low simmer. Turn off the heat and keep warm.'
    )
  end

  hulk =Avenger.create(
      name: "Hulk",
      legalName: "Robert Bruce Banner",
      status: "Active"
  )
  hulk.featured_image.attach(io: File.open(Rails.root.join('app/assets/images/hulk.jpeg')), filename: 'hulk.jpeg', content_type: 'image/jpeg')
  hulk.save!

ironMan =Avenger.create(
    name: "Iron Man",
    legalName: "Tony Stark",
    status: "Active"
)
ironMan.featured_image.attach(io: File.open(Rails.root.join('app/assets/images/ironman.jpeg')), filename: 'ironman.jpeg', content_type: 'image/jpeg')
ironMan.save!


thor =Avenger.create(
    name: "Thor",
    legalName: "Thor Odinson",
    status: "Active"
)
thor.featured_image.attach(io: File.open(Rails.root.join('app/assets/images/thor.jpeg')), filename: 'thor.jpeg', content_type: 'image/jpeg')
thor.save!