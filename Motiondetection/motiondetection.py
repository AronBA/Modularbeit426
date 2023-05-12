import cv2
import Camera
import json
import os
from parser.fileParser import getProjFile

path = getProjFile('settings.json')
camerasettings = []
camerasinstances = []
f = open(path, "r")
data = json.load(f)

for cam in data["cameras"]:
    camerasettings.append(cam)

for i in camerasettings:
    camerasinstances.append(Camera.Camera(camera_adress=i["ip"],path_sound_file="",relais=1,relais_active_duration=5,motion_detection_cooldown=5,motion_detection_threshold=1000, camera_name=i["name"]))


def showcamerastream():
    for camera in camerasinstances:
        cv2.imshow(f'Camera Feed {camera.id}', camera.frame)


while True:

    motion_detected = False

    for camera in camerasinstances:
        camera.checkmotion()
    showcamerastream()
    if cv2.waitKey(1) == ord('q'):
        break

for camera in camerasinstances:
    print(f"Camera {camera.id} destroyed")
    camera.cap.release()
    cv2.destroyAllWindows()
