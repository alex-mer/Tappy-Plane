using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Game : MonoBehaviour {
    public GameObject startScreen;
    public GameObject plane;
    public GameObject score;
    public GameObject rock;

    void Start() {
        Config config = new Config();
        /*GameObject quad;
        quad = GameObject.CreatePrimitive(PrimitiveType.Quad);
        quad.transform.rotation = Quaternion.Euler(90, 0, 0);
        quad.transform.localScale = new Vector3(8, 8, 1);*/
    }

    void Update() {
        if (Config.state == "game") {
            if(rock.transform.position.x.ToString("0.0") == "0,0") {
                score.GetComponent<Score>().updateScore();
            }

            if (Input.GetMouseButtonUp(0)) {
                plane.GetComponent<Plane>().onTap();
            }
        } else {
            if (Input.GetMouseButtonUp(0)) {
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
