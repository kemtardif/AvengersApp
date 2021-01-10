class Api::V1::AvengersController < ApplicationController
  load_and_authorize_resource
  def index
    avenger = Avenger.all.order(created_at: :desc)
    render json: avenger
  end

  def create
    avenger = Avenger.create!(avenger_params)

    if avenger
      render json: avenger
    else
      render json: avenger.errors
    end
  end

  def show
    if avenger
      render json: avenger
    else
      render json: avenger.errors
    end
  end

  def destroy
    avenger&.destroy
    format.html { redirect_to request.referer, alert: 'Avenger destroyed!' }
  end

  def update
    if avenger.update(avenger_params)     
      render json: avenger
    else
      render json: avenger.errors
    end

  end

  private 

  def avenger_params
    params.permit(:id, :name, :legalName, :status, :featured_image)
  end

  def avenger
    @avenger ||= Avenger.find(params[:id])
  end

end
