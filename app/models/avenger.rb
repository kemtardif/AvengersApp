class Avenger < ApplicationRecord
    has_one_attached :featured_image

    validates :name, presence: true
    validates :legalName, presence: true
    validates :status, presence: true
end
