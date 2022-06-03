resource "digitalocean_droplet" "recipiece_droplet" {
  image     = "ubuntu-20-04-x64"
  name      = "recipiece"
  region    = "sfo3"
  size      = "s-1vcpu-1gb"
  user_data = file("recipiece_app.yaml")
}
