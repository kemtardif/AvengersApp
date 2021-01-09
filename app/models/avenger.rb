class Avenger < ApplicationRecord
    has_one_attached :featured_image
    before_create :checkAvatar

    validates :name, presence: true, uniqueness: true
    validates :legalName, presence: true
    validates :status, presence: true

    private

    def checkAvatar 
        if !self.featured_image.attached?               
            self.featured_image.attach(io: File.open(Rails.root.join('app/assets/images/defaultHero.jpeg')), filename: 'defaultHero.jpeg', content_type: 'image/jpeg')
        end
    end
end
