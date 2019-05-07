using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Game : MonoBehaviour {
    public GameObject startScreen;
    public GameObject plane;

    void Start() {
        Debug.Log("zalupa");
        Config config = new Config();
        /*GameObject quad;
        quad = GameObject.CreatePrimitive(PrimitiveType.Quad);
        quad.transform.rotation = Quaternion.Euler(90, 0, 0);
        quad.transform.localScale = new Vector3(8, 8, 1);*/
    }

    void Update() {
        if (Input.GetMouseButtonUp(0)) {
            if (Config.state == "game") {
                plane.GetComponent<Plane>().onTap();
            } else {
                _startGame();
            }
        }
    }

    void _startGame() {
        startScreen.SetActive(false);
        plane.GetComponent<Rigidbody2D>().simulated = true;

        Config.state = "game";
    }
}
