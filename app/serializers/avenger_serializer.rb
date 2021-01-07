class AvengerSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :legalName, :status, :featured_image

  def featured_image
    if object.featured_image.attached?
      {
        url: rails_blob_path(object.featured_image)
      }
    end
  end
end
