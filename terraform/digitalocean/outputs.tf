output "recipiece_ip" {
  value       = digitalocean_droplet.recipiece_droplet.ipv4_address
  description = "Recipiece Droplet IP Address"
}

