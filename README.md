# Project Alvion

## WARNING

- Git: changing names in local files/folders from mayusc/minusc makes the online repo to ignore the change. To avoid this, change to an alternate name, commit and then change it back to the wanted name
- "config/crontab_custom.conf", lines 3 & 4 needs to be uncommented for production

## Disclaimer: (Español)

- Este proyecto fue realizado para conectar un e-commerce con los distintos sistemas legacy erp de latam. NO vas a poder testear el consumo de xml mediante sftp/ftp (necesitas las claves originales para ello), pero si podrás probar la api rest y el frontend.

## Flujo Tareas Programadas

## Download XML

Manejo Errores:

- clase 1: si se interrumpe proceso antes de insertar en xml_registro, se corregirá en el siguiente ciclo
- clase 1: si se interrumpe proceso después de insertar en xml_registro, en el siguiente ciclo el archivo se moverá a directorio error
- clase 2,3,4: si se interrumpe el proceso en cualquier momento posterior a xml_registro, se regularizará en el siguiente ciclo

Clases 1: "ftpHandler", "sftpHandler", "ftpsftpMethods"

- listar cantidad de archivos a descargar en el repo remoto
- por cada archivo:
  - Obtengo la fecha
  - IMPORTANTE: descargo el archivo
  - preparo los valores
  - los agrego a un arreglo
- si hay valores en el arreglo:
  - IMPORTANTE: inserto el arreglo en la tabla xml_registro y retorno nombre de archivos insertados
  - IMPORTANTE: por cada archivo del arreglo: si el archivo fue insertado lo muevo al directorio correcto, sino lo muevo a directorio error

Clase 2: "xmlHandler"

- listar cantidad de archivos descargados en carpeta temporal xml_in
- obtener de xml_register los archivos registrados pero no importados
- construir arreglo con nombre de archivos no importados
- IMPORTANTE: borrar cada archivo listado que no se encuentra en arreglo de no importados
- por cada registro no importado:
  - leer xml
  - minificar xml
  - preparar arreglos de contenido xml y registros id
- si hay valores en arreglo de contenido:

  - IMPORTANTE: insertar valores de arreglo de contenido en tabla xml_content
  - IMPORTANTE: actualizar estado de ids del arreglo registros ids a importado en tabla xml_register. retornar nombre de archivos
  - IMPORTANTE: por cada nombre de archivo importado, borrar archivo de carpeta temporal xml_in

Clase 3: "templateHandler"

- obtener de xml_content los registros no preparados
- por cada registro:
  - convertir contenido en json
  - obtener template
  - obtener path id
  - armar arreglos templateValues, templatesPg, objValues
- si arreglo templateValues tiene valores:
  - obtener template ids
  - filtrar templateValues conservando solo templates unicos
  - IMPORTANTE: insertar templates unicos en xml_template
  - obtener template ids de todos los registros
  - resetear arreglo templatesPg para el siguiente ciclo
  - obtener registros a actualizar en xml_content
  - IMPORTANTE: por cada registro de xml_content no preparado, actualizar template y path id
- IMPORTANTE: actualizar estado preparado de xml_content para los que tengan su template y path id

Clase 4: "normalHandler"

- obtener de xml_content los registros preparados
- obtener de xml_field todas las rutas existintes
- por cada registro de xml_content preparado:
  - obtener json de contenido
  - obtener skeleto del json
  - conservar solo las rutas del origen correspondiente
  - filtrar rutas a solo las que vamos a utilizar
  - agregar valores a arreglo nowValues, gmoValues y contentIds
- IMPORTANTE: insertar valores en la tabla xml correspondiente
- IMPORTANTE: si arreglo contentIds tiene valores, actualizar estado importado de xml_content
