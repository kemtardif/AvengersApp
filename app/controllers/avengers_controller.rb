class AvengersController < ApplicationController

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
    render json: { message: 'You deleted an Avenger, NOOOO!' }
  end

  private 

  def avenger_params
    params.permit(:name, :legalName, :status, :featured_image)
  end

  def avenger
    @avenger ||= Avenger.find(params[:id])
  end
end
