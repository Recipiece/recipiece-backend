resource "digitalocean_domain" "recipiece_domain" {
  name       = "recipiece.org"
  ip_address = digitalocean_droplet.recipiece_droplet.ipv4_address
}

resource "digitalocean_record" "recipiece_naked_record" {
  domain = digitalocean_domain.recipiece_domain.id
  type   = "A"
  name   = "www"
  value  = digitalocean_droplet.recipiece_droplet.ipv4_address
  ttl    = 3600
}

resource "digitalocean_record" "recipiece_www_record" {
  domain = digitalocean_domain.recipiece_domain.id
  type   = "A"
  name   = "@"
  value  = digitalocean_droplet.recipiece_droplet.ipv4_address
  ttl    = 3600
}

resource "digitalocean_record" "recipiece_ns1_record" {
  domain = digitalocean_domain.recipiece_domain.id
  type   = "NS"
  name   = "@"
  value  = "ns1.digitalocean.com"
  ttl    = 1800
}

resource "digitalocean_record" "recipiece_ns2_record" {
  domain = digitalocean_domain.recipiece_domain.id
  type   = "NS"
  name   = "@"
  value  = "ns2.digitalocean.com"
  ttl    = 1800
}

resource "digitalocean_record" "recipiece_ns3_record" {
  domain = digitalocean_domain.recipiece_domain.id
  type   = "NS"
  name   = "@"
  value  = "ns3.digitalocean.com"
  ttl    = 1800
}

resource "digitalocean_record" "recipiece_mx1_record" {
  domain   = digitalocean_domain.recipiece_domain.id
  type     = "MX"
  name     = "@"
  value    = "mx1.privateemail.com"
  ttl      = 14400
  priority = 10
}

resource "digitalocean_record" "recipiece_mx2_record" {
  domain   = digitalocean_domain.recipiece_domain.id
  type     = "MX"
  name     = "@"
  value    = "mx2.privateemail.com"
  ttl      = 14400
  priority = 10
}

resource "digitalocean_record" "recipiece_mail_route_record" {
  domain = digitalocean_domain.recipiece_domain.id
  type   = "TXT"
  name   = "@"
  value  = "v=spf1 include:spf.privateemail.com ~all"
  ttl    = 3600
}

resource "digitalocean_record" "recipiece_mail_record" {
  domain   = digitalocean_domain.recipiece_domain.id
  type     = "CNAME"
  name     = "mail"
  value    = "privateemail.com"
  priority = 43200
}

resource "digitalocean_record" "recipiece_mail_autodiscover_record" {
  domain   = digitalocean_domain.recipiece_domain.id
  type     = "CNAME"
  name     = "autodiscover"
  value    = "privateemail.com"
  priority = 43200
}

resource "digitalocean_record" "recipiece_mail_autoconfig_record" {
  domain   = digitalocean_domain.recipiece_domain.id
  type     = "CNAME"
  name     = "autoconfig"
  value    = "privateemail.com"
  priority = 43200
}
