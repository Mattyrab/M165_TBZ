# KN-01-P

## Installation

Prometheus Node-Exporter Metrics
![Prometheus Node-Exporter Metrics](<Screenshot 2025-04-28 120637.png>)

Prometheus Dashboard
![Prometheus Dashboard](<Screenshot 2025-04-28 120719.png>)

Grafana Dashboard
![Grafana Dashboard](<Screenshot 2025-04-28 120833.png>)

Grafana Metrics für Prometheus
![Grafana Metrics for Prometheus](<Screenshot 2025-04-28 120857.png>)

## Erklärungen Cloud-Init


1. Was sind Scrapes?  
"Scrapes" bezeichnet den Prozess, bei dem Metriken von überwachten Zielen gesammelt werden. Darauf ist Prometheus basiert.

```yaml
#cloud-config

write_files:
  - path: /etc/prometheus/prometheus.yml
    permissions: '0644'
    content: |
      global:
        scrape_interval: 15s
      scrape_configs:
        - job_name: prometheus
          static_configs:
            - targets: ['localhost:9090']
        - job_name: node
          static_configs:
            - targets: ['localhost:9100']
      rule_files:
        - "/etc/prometheus/rules.yml"
```

2. Was sind Rules?  
In Prometheus. gibt es zwei Arten von Rules: Recording Rules und Alerting Rules.
Recording Rules ermöglichen es Ihnen, häufig verwendete oder teure Berechnungen vorzunehmen und deren Ergebnisse als neue Zeitserien zu speichern.
Alerting Rules hingegen definieren die Bedingungen, bei denen Alarme ausgelöst werden.

```yaml
#cloud-config

  - path: /etc/prometheus/rules.yml
    permissions: '0644'
    content: |
      groups:
        - name: custom_rules
          rules:
            - record: node_memory_MemFree_percent
              expr: 100 - (100 * node_memory_MemFree_bytes / node_memory_MemTotal_bytes)
            - record: node_filesystem_free_percent
              expr: 100 * node_filesystem_free_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"}
        - name: alert_rules
          rules:
            - alert: InstanceDown
              expr: up == 0
              for: 1m
              labels:
                serverity: critical
              annotations:
                summary: "Instance {{ $labels.instance }} down"
                description: "Instance {{ $labels.instance }} of job {{ $labels.job }} has been down for more than 1 minute."
```


3. Was sind die Schritte, die Sie als Programmierer ausführen müssen, um eigene Daten in Prometheus zu speichern?  
Wählen Sie eine Prometheus Client-Bibliothek für Ihre Software und definiere, welche Metriken Sie in der Software bereitstellen möchten. Danach Prometheus konfigurieren, um diese zu sammeln.

4. Welche Variablen werden verwendet in den Scrapes und Rules und von welchen Seiten/URLs kommen diese Variablen?   
Die Software stellt die Variablen über einen dedizierten Endpunkt bereit, der in der Regel `/mertics` benannt ist. Andernfalls kann auch die Verwendung bestimmter Ports zur Bereitstellung von Metriken verwendet werden. Diese werden in den `scrape_configs` als `targets` angegeben. Jede Metrik ist mit dem Schlüsselwort `record` zugänglich und kann in einem Ausdruck (`expr`) verwendet werden.

5. Wie weiss Prometheus, ob ein System up ist?  
Ob ein System in Betrieb ist, wird durch die eingebaute `up` Metrik festgestellt, die automatisch während des "Scrape" Prozesses generiert wird.
Wenn Prometheus versucht, ein Ziel zu scrapen, erzeugt es automatisch eine `up` Metrik mit einem Wert, die entweder:  
"1" ist wenn das Scrapen erfolgreich war.  
"0" ist wenn das Scrapen fehlgeschlagen ist (Ziel unerreichbar, Zeitüberschreitung, HTTP-Fehler, usw.).  