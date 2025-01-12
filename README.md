# Инструмент нагрузочного тестирования прилоения ephemerex

### Подготовка
- Установить golang `sudo snap install go --classic`
- Установить xk6 для построения кастомных билдов `go install go.k6.io/xk6/cmd/xk6@v0.13.3` 
- Добавить путь к xk6 в PATH `export PATH=$PATH:$HOME/go/bin`  
- Добавить в loadtests/extensions.txt необходимые расширения

## Порядок запуска

### Собрать кастомный бинарник k6 с расширениями  
`make build`  
  
### Поднять инфраструктуру мониторинга  
`make infra`  
После запуска поднимется prometheus и grafana.  
В графане (user - admin, pass - admin):
1. Добавить источник (http://localhost:3000/connections/datasources) prometheus (http://prometheus:9090/) 
2. Добавить дашборд (http://localhost:3000/dashboards) из файла `grafana_k6_dashboard.json`

### Запуск  
`make run`   

## На заметку  
- Бинарник k6 после локальной сборки кладется в `/usr/local/bin`, откуда и запускается общей командой `k6`  
- Переменные среды, используемые k6, задаются в `.env` файле в корне проекта  
- Метрики k6 отдаются в prometheus (localhost:9090)
- Из prometheus они читаются и визуализируются в grafana (localhost:3000)

## Доделать
1. Упаковать бинарник нагрузки в контейнер и запускать нагрузку из него