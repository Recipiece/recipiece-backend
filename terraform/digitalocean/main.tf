terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {

}

data "digitalocean_project" "recipiece_project" {
  name = "Recipiece"
}

resource "digitalocean_project_resources" "recipiece_project_resources" {
  project = data.digitalocean_project.recipiece_project.id
  resources = [
    digitalocean_droplet.recipiece_droplet.urn,
    digitalocean_domain.recipiece_domain.urn
  ]
}
