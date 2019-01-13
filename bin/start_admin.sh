#!/bin/sh

# Writable location for GeoServer NetCDF index files
NETCDF_DATA_DIR="$HOME/.geoserver"
mkdir -p "$NETCDF_DATA_DIR"
export JAVA_OPTS="-DNETCDF_DATA_DIR=$NETCDF_DATA_DIR"

/usr/local/lib/geoserver-2.13.2/bin/startup.sh &

DELAY=40

(
for TIME in `seq $DELAY` ; do
  sleep 1
  echo "$TIME $DELAY" | awk '{print int(0.5+100*$1/$2)}'
done
) | zenity --progress --auto-close --text "GeoServer starting"

# how to set 5 sec timeout?
zenity --info --text "Starting web browser ..."
firefox "http://localhost:8082/geoserver/web/"
