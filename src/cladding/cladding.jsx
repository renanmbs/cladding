import React from 'react';
import '../cladding/cladding.css'; // Optional CSS module for styling

export default function Cladding() {
  return (
    <div className="section2 cladding-section">

      <div className="divider-container">
        <div className="line"></div>
        <div className="text">
          <h3>Cladding & Rainscreen Systems</h3>
        </div>
        <div className="line"></div>
      </div>

      <div className="cladding-cards">

        <div className="cladding-card">
          <img src="/Cladding/Cladding Page Clip and Rail System thumbnail 2.png" alt="Clip & Rail Systems" className='img2'/>
          <h3>CLIP & RAIL SYSTEMS</h3>
          <p>
            Our cladding clip and rail systems are perfect for concealed anchor installations and are compatible with any panel material you desire.
          </p>
        </div>

        <div className="cladding-card">
          <img src="/Cladding/Substructures Thumbnail.png" alt="Substructures" className='img2'/>
          <h3>SUBSTRUCTURES</h3>
          <p>
            Our cladding support components can be used behind almost any cladding system. The 1" projection can far out the wall for admired and ventilated cavity behind moisture sensitive.
          </p>
        </div>

        <div className="cladding-card card2">
          <img src="Cladding/Horizontal WB Thumbnail (1).png" alt="Thermal Wall Brackets" />
          <h3>THERMAL WALL BRACKETS</h3>
          <p>
            Used to support wind and dead loads of whole systems. Our wall brackets can be fabricated to achieve anywhere from a 2° - 65° projection in vertical or horizontal orientation.
          </p>
        </div>

      </div>

    </div>
  );
}
