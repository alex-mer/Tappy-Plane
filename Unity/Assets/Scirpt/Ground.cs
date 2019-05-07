using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Ground : MonoBehaviour {
    public float speed;
    public float gap;

    void Update() {
        if (Config.state == "game") {
            float width = GetComponent<Renderer>().bounds.size.x;
            
            if (transform.position.x < -(width + gap)) {
                transform.position = new Vector3((2 * width + transform.position.x), transform.position.y, transform.position.z);
            }

            transform.position = new Vector3(transform.position.x - speed, transform.position.y, transform.position.z);
        }
    }
}
